import * as api from './api';

export const getListAction = () => {
  api.getList(
    (res) => {
      console.log(res);
    },
    (err) => {
      console.log(err);
    },
  );
};

export const testPost = () => {
  api.testPost(
    (res) => {
      console.log(res);
    },
    (err) => {
      console.log(err);
    },
  );
};
