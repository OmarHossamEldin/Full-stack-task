function optionsFilteration(data){
    let options = [];
    if(Array.isArray(data) === false)
      return {'id':data.id, 'name': data.name};
    data.forEach(function(row){
      options.push({'id':row.id, 'name': row.name});
    });  
    return options;
}

export default optionsFilteration;