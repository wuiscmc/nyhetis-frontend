Config = {
  //root: 'http://nyhetis.lvh.me/api/v1',
  root: 'http://127.0.0.1:3000/api/v1',
  url: function(path){
    return this.root + path;
  }
};
