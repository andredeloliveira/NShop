/*still needs to adjust better the rendering of the images as a grid. For some shitty reason
is not working.*/
Meteor.subscribe("images");
ImageField = React.createClass({
  returnFiles(){
    var files = this.state.files;
    return files;
  },
  getInitialState(){
    return{
      files: []
    }
  },
  cleanImages(){
    this.setState({
      files: []
    });
  },
  /*If the user wants to delete any undesired picture that he/she might uploaded,
  this method will remove it*/
  removeImage(idx,e){
    var newFiles = this.state.files;
    var removedImage = newFiles.splice(idx, 1);
    this.setState({
      files: newFiles
    });
  },
  onDrop(files){
    this.setState({
      files: files
    });
  },
  onOpenClick(){
    this.refs.dropzone.open();
  },
  imagesRender(){

    return this.state.files.map((file, index)=>{
      console.log(file);
      let remove = this.removeImage.bind(this, index);
      return (
        <div key={index} id={file.name} className="ui grid">
          <div className="row">
            <div className="column">
            <span alt="remove image" className="circular red ui button " onClick={remove}>X</span>
            <img src={file.preview} alt={file.name} className="ui medium image"  />
            </div>
          </div>
        </div>
      );
    });
  },
  render(){
    return(
      <div>
        <Dropzone ref="dropzone" onDrop={this.onDrop} multiple={true}>
          <div> Try dropping some files here, or click to select files to upload</div>
        </Dropzone>
        {this.state.files ? <div>
          {this.imagesRender()}
        </div> : null }
     </div>
    );
  }
});
