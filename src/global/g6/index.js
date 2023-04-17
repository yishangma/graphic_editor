import G6 from '@antv/g6'
import registerNode from './node/index'
import registerBehavior from './behavior/index'
import registerEdge from './edge/index'
import config from './config/index'
// 挂在config
G6.$C = config
registerBehavior(G6)

registerNode(G6)

registerEdge(G6)
export default G6
