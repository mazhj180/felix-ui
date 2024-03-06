import emitter from "@/emitter";

export class WebSocketService {
    private ws: WebSocket | null = null;
    private heartbeatInterval: number = 20000; // 20秒
    private heartbeatTimer: number | null = null;
  
    constructor(private url: string) {
      this.connect();
    }
  
    connect():void {
      this.ws = new WebSocket(this.url);
      console.log('@@@@',this.url)
      this.ws.onopen = () => {
        console.log("WebSocket连接成功");
        this.startHeartbeat();
      };
  
      this.ws.onmessage = (message) => {
        console.log("收到消息:", message.data);
        emitter.emit('notify',message.data)
      };
  
      this.ws.onerror = (error) => {
        console.error("WebSocket错误:", error);
      };
  
      this.ws.onclose = () => {
        console.log("WebSocket连接关闭");
        this.stopHeartbeat();
        // 可以在这里重新连接或执行其他逻辑
      };
    }
  
    startHeartbeat() {
      this.stopHeartbeat(); // 停止之前的心跳
      this.heartbeatTimer = window.setInterval(() => {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
          this.ws.send(JSON.stringify({
            msgType :'IDLE_STATE',
            userId : localStorage.getItem('userId')
          }));
        }
      }, this.heartbeatInterval);
    }
  
    stopHeartbeat() {
      if (this.heartbeatTimer !== null) {
        clearInterval(this.heartbeatTimer);
        this.heartbeatTimer = null;
      }
    }
  
    // 其他需要的方法，如发送消息
    sendMessage(message: string) {
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        this.ws.send(message);
      }
    }
  
    // 清理资源，关闭WebSocket连接
    disconnect() {
      this.stopHeartbeat();
      if (this.ws) {
        this.ws.close();
      }
    }
  }
  