import React from 'react';
import './App.css';
import JinjaInput from './components/JinjaInput.js';
import CompilerOutput from './components/CompilerOutput.js';
import Header from './components/Header.js';
import SplitPane from "react-split-pane";
import Status from './components/Status.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'semantic-ui-css/semantic.min.css';
import yaml from 'js-yaml';
import axios from 'axios';
import './edit.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jinja_input: 'Enter your Jinja template here!\n\nSample {{ type }} Template',
      jinja_variable: '# Variables can be in JSON or YAML\n\n{\n    "type": "Jinja"\n}',
      jinja_output: 'Enter your Jinja template here!\n\nSample Jinja Template',
      jinja_error: 'Backend errors (If any) will be displayed here!',
      response_code: 200,
      errors: {
        jinja_input: '',
        jinja_variable: '',
      }
    }
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({ window_width: window.innerWidth, window_height: window.innerHeight });
  }

  isJson = (str) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
  }
  isYaml = (str) => {
    try {
        yaml.safeLoad(str);
    } catch (e) {
        return false;
    }
    return true;
  }

  postData = () => {
    const { jinja_input, jinja_variable } = this.state;
    const URL = 'http://' + process.env.REACT_APP_BACKEND_HOST + ':' + process.env.REACT_APP_BACKEND_PORT + '/render_jinja';
    console.log(URL);
    axios.post(URL,
    {jinja_input, jinja_variable },
    {headers: {"Access-Control-Allow-Origin": "*"}})
    .then((response) => {
      this.setState({response_code: response.status});
      this.setState({jinja_output: response.data});
    }, (error) => {
      this.setState({response_code: error.response.status});
      this.setState({jinja_output: "\n" + error.response.data});
    });
  }
  isReady = (errors) => {
    for (var name in errors) {
      if (errors[name] !== "") {
        return false;
      }
    }
    return true;
  }
  submitButton = (e) => {
    let errors = this.state.errors;
    if (this.isReady(errors)) {
      this.setState({jinja_error: 'Backend errors (If any) will be displayed here!'})
      this.setState({error: false});
      this.postData();
    } else {
      this.setState({error: true});
    }
  }
  jinjaInput = (val) => {
    const name = "jinja_input";
    const value = val;
    let errors = this.state.errors;
    errors.jinja_input =
      value.length < 1
      ? 'Template input should not be blank'
      : '';
    this.setState({errors, [name]: value}, ()=> {
      console.log(errors)
    });
  }
  variableInput = (val) => {
    const name = "jinja_variable";
    const value = val;
    let errors = this.state.errors;
    errors.jinja_variable =
      value.length < 1
      ? 'Template input should not be blank'
      : errors.jinja_variable =
          !(this.isJson(value) || this.isYaml(value)) ? 'Variable is neither JSON nor YAML'
      : '';
    this.setState({errors, [name]: value}, ()=> {
      console.log(errors)
    });
  }
  inputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let errors = this.state.errors;

    switch (name) {
      case 'jinja_input':
        errors.jinja_input =
          value.length < 1
          ? 'Template input should not be blank'
          : '';
        break;
      case 'jinja_variable':
        errors.jinja_variable =
          value.length < 1 ? 'Variable input should not be blank'
      : errors.jinja_variable =
          !(this.isJson(value) || this.isYaml(value)) ? 'Variable is neither JSON nor YAML'
      : '';
        break;
      default:
      break;
    }
    this.setState({errors, [name]: value}, ()=> {
      console.log(errors)
    });
  }
  dropHandleJinja = (event) => {
    event.stopPropagation();
    event.preventDefault();
    var that = this;
    event.dataTransfer.files[0].text().then(
      function(data) {
        that.setState({jinja_input: data});
      });
  }
  dropHandleVar = (event) => {
    event.stopPropagation();
    event.preventDefault();
    var that = this;
    event.dataTransfer.files[0].text().then(
      function(data) {
        that.setState({jinja_variable: data});
      });
  }
  handleVerticalSlider = (pos) => {
    this.setState({vertical_slider_position: pos});
  }
  handleHorizontalSlider = (pos) => {
    this.setState({horizontal_slider_position: pos});
  }
  preventDef = (event) => {
    event.preventDefault();
  }
  render() {
    return (
      <div>
        <Header submitButton={this.submitButton} />
        <Status error={this.state.error} errors={this.state.errors} />
        <SplitPane split="vertical" minSize={this.state.window_width*0.2} maxSize={this.state.window_width*0.8} defaultSize={this.state.window_width*0.5} onChange={this.handleVerticalSlider}>
          <JinjaInput
              window_height={this.state.window_height}
              window_width={this.state.window_width}
              vertical_slider_position={this.state.vertical_slider_position}
              horizontal_slider_position={this.state.horizontal_slider_position}
              handleHorizontalSlider={this.handleHorizontalSlider}
              jinja_input={this.state.jinja_input}
              jinja_variable={this.state.jinja_variable}
              jinja_output={this.state.jinja_output}
              inputChange={this.inputChange}
              jinjaInput={this.jinjaInput}
              variableInput={this.variableInput}
              dropHandleJinja={this.dropHandleJinja}
              dropHandleVar={this.dropHandleVar}
              preventDef={this.preventDef}
          />
          <CompilerOutput
              window_height={this.state.window_height}
              window_width={this.state.window_width}
              jinja_error={this.state.jinja_error}
              jinja_output={this.state.jinja_output}
              response_code={this.state.response_code}
          />
        </SplitPane>
      </div>
    );
  }
}

export default App;
