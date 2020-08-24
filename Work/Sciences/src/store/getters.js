import index from './modules/index';
import ResourceManagement from './modules/ResourceManagement';
const getters = {
  navStatus: () => index.state.navStatus,
  ResourceManagementIndexTable: () => ResourceManagement.state.index.tableData,
};
export default getters
