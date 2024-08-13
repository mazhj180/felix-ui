import mtt from 'mitt'

type MyEvents = {
    // // app
    // 'hide-head': (value:boolean) => void;
    // 'hide-foot': (value:boolean) => void
    // 'hide-home': (value:boolean) => void
    // 'logined': () => void
    // 'logout' : () => void
    // 'notify': (msg:any) => void
    // // topic
    // 'hide-topic': (value:boolean) => void
    // 'input-remark': (flag: any, who: any) => void;
};
const emitter = mtt()
export default emitter