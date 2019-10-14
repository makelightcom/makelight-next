import { object } from "prop-types";
import ErrorBoundary from "../ErrorBoundary";
import env from "../../utils/env";

let Plyr;

class Player extends React.Component {
  static propTypes = {
    slice: object
  };

  constructor() {
    super();
    this.state = {
      video: false
    };
    if (typeof window !== "undefined") {
      Plyr = require("react-plyr");
    }
  }

  componentDidMount() {
    this.setState({
      video: true
    });
  }

  render() {
    if (!this.state.video) {
      return <div />;
    }
    return (
      <div className="py-8">
        <ErrorBoundary>
          <div className="w-100 rounded overflow-hidden shadow-lg no-underline">
            <link
              rel="stylesheet"
              href={`/static/css/plyr.css?build=${env.DEPLOYMENT_ID}`}
            />

            <Plyr
              type={this.props.type}
              videoId={this.props.slice.value.split("/").pop()}
            />
          </div>
        </ErrorBoundary>
      </div>
    );
  }
}

export default Player;
