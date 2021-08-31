function notifyAlert(response) {
    switch(response.status){
        case 201:
        case 200:
        case 206:
          this.$q.notify({
            type: 'positive',
            message: response.data.message
          });
          break; 
        case 422:
          let errors = response.data.errors;
          for (let error in errors){
            this.$q.notify({
              type: 'negative',
              message: errors[error]
            });
          }
          break;
        default:
          console.log(response.status);
          console.log(response.data);
          console.log(response.headers);
    }
}

export default ({ Vue }) => {
  Vue.prototype.$notifyAlert = notifyAlert;
}