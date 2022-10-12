const Entity = require('./entity');

module.exports = class SocketEntity extends Entity {
  constructor(socket) {
    super();
    this.socket = socket;
  }

  send(message, ...args) {
    this.socket.emit(message, ...args);
  }
};
