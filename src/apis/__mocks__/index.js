const mocks = [require('./loginMock'), require('./noteGetMock')];

const defaultMock = {
  default: {
    response: () => ({ data: {} })
  }
};

export default {
  request: api => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let mock = (mocks.find(m => m.default.request(api)) || defaultMock).default;
        let { data, status = 200, headers } = mock.response(api);
        if (status >= 200 && status < 400) {
          resolve({ data, status, headers });
        } else {
          const error = Error('Error');
          error.response = { data, status, headers };
          reject(error);
        }
      }, 2000);
    });
  }
};
