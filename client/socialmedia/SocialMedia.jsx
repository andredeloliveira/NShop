SocialMedia = React.createClass({
  render(){
    var style= {
      fontSize: '3.77em'
    };
    return(
      <div className="ui centered aligned grid six columns">
        <div className="row">
          <div className="column">
            <i className="icon facebook socialMedia" style={style} alt="Share on Facebook"></i>
          </div>
          <div className="column">
            <i className="icon twitter socialMedia" alt="Tweet it" style={style}></i>
          </div>
          <div className="column">
            <i className="icon google plus socialMedia" alt="Plus it" style={style}></i>
          </div>
          <div className="column">
            <i className="icon pinterest socialMedia" alt="Share on Pinterest" style={style}></i>
          </div>
        </div>
      </div>
    );
  }
});
