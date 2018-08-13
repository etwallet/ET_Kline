import user from "../../models/user";
import axios from "axios";
import axiosRetry from "axios-retry";
axiosRetry(axios, {
  retries: 5,
  retryCondition(err) {
    var url = window.location.href;
    url = url.substring(url.lastIndexOf("/") + 1, url.length);
    // console.log("===url=======" + url);
    if (url === "user_payment") {
      return ["post"].indexOf(err.config.method) > -1;
    }
    // return ["post"].indexOf(err.config.method) > -1;
  }
});

function retryFailedRequest(err) {
  if (err.status === 500 && err.config && !err.config.__isRetryRequest) {
    err.config.__isRetryRequest = true;
    return axios(err.config);
  }
  throw err;
}
axios.interceptors.response.use(undefined, retryFailedRequest);

let upload = {};

upload.verify = function(file_name) {
  let file_info = file_name.split(".");
  if (file_info.length < 1) {
    return false;
  }
  let suffix = file_info[file_info.length - 1].toLowerCase();

  if (["jpg", "png", "jpeg", "gif"].indexOf(suffix) < 0) {
    return false;
  }

  return true;
};

upload.getSuffix = function(file_name) {
  let file_info = file_name.split(".");
  let suffix = file_info[file_info.length - 1];
  return suffix;
};

upload.uploadImg = function(file, type) {
  return new Promise((resolve, reject) => {
    user
      .getUploadInfo(type)
      .then(data => {
        let uploadInfo = data.data;
        let params = new FormData();
        let config = {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        };
        params.append("acl", uploadInfo.acl);
        params.append("Content-Type", uploadInfo.content_type);
        params.append("bucket", uploadInfo.bucket);
        params.append(
          "key",
          uploadInfo.path + uploadInfo.key + "." + this.getSuffix(file.name)
        );
        params.append("x-amz-algorithm", uploadInfo.algorithm);
        params.append("x-amz-credential", uploadInfo.credential);
        params.append("x-amz-date", uploadInfo.date);
        params.append("policy", uploadInfo.policy);
        params.append("x-amz-signature", uploadInfo.signature);
        params.append("file", file, file.name);
        axios
          .post(uploadInfo.hosts, params, config)
          .then(() => {
            resolve({
              url:
                "//" +
                uploadInfo.bucket +
                "/" +
                uploadInfo.path +
                uploadInfo.key +
                "." +
                this.getSuffix(file.name)
            });
          })
          .catch(error => {
            reject(error);
          });
      })
      .catch(e => {
        reject(e);
      });
  });
};

export default upload;
