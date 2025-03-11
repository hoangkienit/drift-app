import _ from 'lodash';

export const isDataEqual = (newData, oldData) => {
  return _.isEqual(newData, oldData);
};
