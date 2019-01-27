import Cookies from 'js-cookie';
import createHash from 'sha.js';
import Evaporate from 'evaporate';
import SparkMD5 from 'spark-md5';

import './css/bootstrap.css';
import './css/styles.css';

const request = (method, url, data, headers, el, cb) => {
  let req = new XMLHttpRequest();
  req.open(method, url, true);

  Object.keys(headers).forEach((key) => {
    req.setRequestHeader(key, headers[key]);
  });

  req.onload = () => {
    cb(req.status, req.responseText);
  };

  req.onerror = req.onabort = () => {
    disableSubmit(false);
    error(el, 'Sorry, failed to upload file.');
  };

  req.send(data);
};

const parseNameFromUrl = (url) => {
  return decodeURIComponent((url + '').replace(/\+/g, '%20'));
};

const parseJson = (json) => {
  let data;
  try {
    data = JSON.parse(json);
  }
  catch (e) {
    data = null;
  }
  return data;
};

const updateProgressBar = (element, progressRatio) => {
  const bar = element.querySelector('.bar');
  bar.style.width = Math.round(progressRatio * 100) + '%';
};

const error = (el, msg) => {
  el.className = 's3direct form-active';
  el.querySelector('.file-input').value = '';
  alert(msg);
};

let concurrentUploads = 0;

const disableSubmit = (status) => {
  const submitRow = document.querySelector('.submit-row');
  if( ! submitRow) return;

  const buttons
    = submitRow.querySelectorAll('input[type=submit],button[type=submit]');

  if (status === true) concurrentUploads++;
  else concurrentUploads--;

  ;[].forEach.call(buttons, (el) => {
    el.disabled = (concurrentUploads !== 0);
  });
};

const beginUpload = (element) => {
  disableSubmit(true);
  element.className = 's3direct progress-active';
};

const finishUpload = (element, awsBucketUrl, objectKey) => {
  const link = element.querySelector('.file-link');
  const url = element.querySelector('.file-url');
  url.value = awsBucketUrl + '/' + objectKey;
  link.setAttribute('href', url.value);
  link.innerHTML = parseNameFromUrl(url.value).split('/').pop();
  element.className = 's3direct link-active';
  element.querySelector('.bar').style.width = '0%';
  disableSubmit(false);
};

const computeMd5 = (data) => {
  return btoa(SparkMD5.ArrayBuffer.hash(data, true));
};

const computeSha256 = (data) => {
  return createHash('sha256').update(data, 'utf-8').digest('hex');
};

const getCsrfToken = (element) => {
  const cookieInput = element.querySelector('.csrf-cookie-name');
  const input = document.querySelector('input[name=csrfmiddlewaretoken]');
  const token = input ? input.value : Cookies.get(cookieInput.value);
  return token;
};

const generateAmzInitHeaders = (acl, serverSideEncryption, sessionToken) => {
  const headers = {};
  if (acl) headers['x-amz-acl'] = acl;
  if (sessionToken) headers['x-amz-security-token'] = sessionToken;
  if (serverSideEncryption) {
    headers['x-amz-server-side-encryption'] = serverSideEncryption;
  }
  return headers;
};

const generateAmzCommonHeaders = (sessionToken) => {
  const headers = {};
  if (sessionToken) headers['x-amz-security-token'] = sessionToken;
  return headers;
};

const generateCustomAuthMethod = (element, signingUrl, dest) => {
  const getAwsV4Signature = (
    signParams,
    signHeaders,
    stringToSign,
    signatureDateTime,
    canonicalRequest) => {
      return new Promise((resolve, reject) => {
        const form = new FormData();
        const headers = {'X-CSRFToken': getCsrfToken(element)};

        form.append('to_sign', stringToSign);
        form.append('datetime', signatureDateTime);
        form.append('dest', dest);

        request('POST', signingUrl, form, headers, element, (status, s3Objkey) => {
          switch (status) {
            case 200:
              resolve(s3Objkey);
              break;
            case 403:
              reject('Permission denied to generate AWS v4 signature.');
              break;
            default:
              reject('Could not generate AWS v4 signature.');
              break;
            };
        });
      })
  };

  return getAwsV4Signature;
};

const initiateUpload = (element, signingUrl, uploadParameters, file, dest) => {

  const createConfig = {
    customAuthMethod: generateCustomAuthMethod(element, signingUrl, dest),
    aws_key: uploadParameters.access_key_id,
    bucket: uploadParameters.bucket,
    awsRegion: uploadParameters.region,
    computeContentMd5: true,
    cryptoMd5Method: computeMd5,
    cryptoHexEncodedHash256: computeSha256,
    partSize: 20 * 1024 * 1024,
    logging: true,
    allowS3ExistenceOptimization: true,
    s3FileCacheHoursAgo: 12
  };

  const addConfig = {
    name: uploadParameters.object_key,
    file: file,
    contentType: file.type,
    xAmzHeadersCommon: generateAmzCommonHeaders(
      uploadParameters.session_token
    ),
    xAmzHeadersAtInitiate: generateAmzInitHeaders(
      uploadParameters.acl,
      uploadParameters.server_side_encryption,
      uploadParameters.session_token
    ),
    notSignedHeadersAtInitiate: {
      'Cache-Control': uploadParameters.cache_control,
      'Content-Disposition': uploadParameters.content_disposition
    },
    progress: (progressRatio, stats) => {
      updateProgressBar(element, progressRatio);
    },
    warn: (warnType, area, msg) => {
      if(msg.includes('InvalidAccessKeyId')){
        error(element, msg);
      }
    }
  };

  Evaporate
    .create(createConfig)
    .then(
      (evaporate) => {
        beginUpload(element);

        evaporate
          .add(addConfig)
          .then(
            (s3Objkey) => {
              finishUpload(element, uploadParameters.bucket_url, s3Objkey);
            },
            (reason) => {
              return error(element, reason);
            }
          )
      }
    );
};

const checkFileAndInitiateUpload = (event) => {
  const element = event.target.parentElement;
  const file = element.querySelector('.file-input').files[0];
  const dest = element.querySelector('.file-dest').value;
  const destCheckUrl = element.getAttribute('data-policy-url');
  const signerUrl = element.getAttribute('data-signing-url');
  const form = new FormData();
  const headers = {'X-CSRFToken': getCsrfToken(element)};

  form.append('dest', dest);
  form.append('name', file.name);
  form.append('type', file.type);
  form.append('size', file.size);

  request('POST', destCheckUrl, form, headers, element, (status, response) => {
    const uploadParameters = parseJson(response);
    switch(status) {
      case 200:
        initiateUpload(element, signerUrl, uploadParameters, file, dest);
        break;
      case 400:
      case 403:
      case 500:
        error(element, uploadParameters.error);
        break;
      default:
        error(element, 'Sorry, could not get upload URL.');
    };
  });
};

const removeUpload = (e) => {
  e.preventDefault();
  const el = e.target.parentElement;
  el.querySelector('.file-url').value = '';
  el.querySelector('.file-input').value = '';
  el.className = 's3direct form-active';
};

const addHandlers = (el) => {
  const url = el.querySelector('.file-url');
  const input = el.querySelector('.file-input');
  const remove = el.querySelector('.file-remove');
  const status = (url.value === '') ? 'form' : 'link';

  el.className = 's3direct ' + status + '-active';
  remove.addEventListener('click', removeUpload, false);
  input.addEventListener('change', checkFileAndInitiateUpload, false);
};

document.addEventListener('DOMContentLoaded', (event) => {
  [].forEach.call(document.querySelectorAll('.s3direct'), addHandlers);
});

document.addEventListener('DOMNodeInserted', (event) => {
  if(event.target.tagName) {
    const el = event.target.querySelectorAll('.s3direct');
    [].forEach.call(el, (element, index, array) => {
      addHandlers(element);
    });
  }
});