/**
 * Created by matt on 7/6/17.
 */

const debug = (log=false, groupName, stuff={}) => {
  if (log) {
    console.group(groupName)
    Object.keys(stuff).map(key=> {
      console.log("%c"+key + ':  ','font-weight: bold',stuff[key])
      return null;
    });
    console.groupEnd()
  }
  return false;
};

export default debug
