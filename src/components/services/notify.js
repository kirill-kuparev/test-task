const notify = {
  info: (message) => {
    notify.show(message, 'info')
  },
  danger: (message) => {
    notify.show(message, 'danger')
  },
  error: (message) => {
    notify.show(message, 'danger')
  },
  success: (message) => {
    notify.show(message, 'success')
  },
  warning: (message) => {
    notify.show(message, 'warning')
  },
  show: (message, type) => {
    window.$.notify({
      message
    },{
      type
    });
  }
};

export default notify;
