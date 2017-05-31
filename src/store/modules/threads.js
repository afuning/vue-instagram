import { getThreads } from '../api';
import * as types from '../types';

export default {
  state() {
    return {
      threads: [],
      loading: false,
      success: true,
    };
  },
  mutations: {
    [types.THREADS](state, threads) {
      // 这里的 `state` 对象是模块的局部状态
      state.threads = state.threads.concat(threads);
      state.loading = false;
    },
    [types.THREADS_FAIL](state) {
      state.loading = false;
      state.success = false;
    },
    [types.THREADS_LOADING](state) {
      state.loading = true;
    },
  },
  actions: {
    getThreads({ commit }, query) {
      getThreads(query).then(
        (res) => {
          if (res.data.status === 'ok') {
            commit(types.THREADS, res.data.data.user.edge_web_feed_timeline.edges);
          } else {
            commit(types.THREADS_FAIL);
          }
        },
        (err) => {
          commit(types.THREADS_FAIL, err);
        },
      );
    },
  },
};
