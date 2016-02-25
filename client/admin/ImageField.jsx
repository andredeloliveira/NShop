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
      let testClick = this.removeImage.bind(this, index);
      var newKey = file.name + 'wow';
      return (
        <div key={newKey + 'div'} id={file.name} className="column">
          <div className="row">
            <img src={file.preview} className="adminImage"  />
            <span alt="remove image" className="circular red ui button " onClick={testClick}>X</span>
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
