import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import * as data from "./api.json";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      countries: [],
      types: [],
      cities: [],
      tanktype: [],
      uniqueCountry: [],
      uniqueName: [],
      ammu: [],
    };
    this.changeType = this.changeType.bind(this);
    this.changeCountry = this.changeCountry.bind(this);
    this.changeName = this.changeName.bind(this);
    this.changeAmmu = this.changeAmmu.bind(this);
  }

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  getUnique(arr, comp) {
    const unique = arr
      //store the comparison values in array
      .map((e) => e[comp])

      // store the keys of the unique objects
      .map((e, i, final) => final.indexOf(e) === i && i)

      // eliminate the dead keys & store unique objects
      .filter((e) => arr[e])

      .map((e) => arr[e]);

    return unique;
  }

  componentDidMount() {
    const countries = data.default;
    this.setState({
      countries: countries,
    });

    console.log(countries);
  }

  changeType(event) {
    this.setState({
      name: "",
      country: "",
      ammui: "",
    });
    this.setState({ type: event.target.value });
    this.setState({
      uniqueCountry: this.state.countries.filter(
        (x, y, z) => z.indexOf(x) === y && y && x.type === event.target.value
      ),
    });
  }

  changeCountry(event) {
    this.setState({
      name: "",
      ammui: "",
    });
    this.setState({ country: event.target.value });
    this.setState({
      uniqueName: this.state.countries.filter(
        (x) => x.country === event.target.value && x.type === this.state.type
      ),
    });
  }

  changeName(event) {
    this.setState({
      ammui: "",
    });
    this.setState({ name: event.target.value });
    this.setState({
      ammu: this.state.countries.find(
        (stat) =>
          stat.name === event.target.value &&
          stat.country === this.state.country &&
          stat.type === this.state.type
      ).ammunition,
    });

    // console.log(this.state.ammu);
  }

  changeAmmu(event) {
    this.setState({ ammui: event.target.value });
    this.setState({
      ammunition: [],
    });
  }

  render() {
    let { countries, uniqueCountry, uniqueName, ammu } = this.state;

    let tanktype = this.getUnique(countries, "type");

    return (
      <div className="container">
        <div class="row">
          <div class="col-12 col-md-12">
            <br></br>
            <h2 class="text-center">REACT APP</h2>
            <br></br>
            <form ref="contact">
              <div class="form-group row">
                <div class="col-12 col-md-6">
                  <label for="country">Tank Type</label>
                  <select
                    name="type"
                    value={this.state.type}
                    onChange={this.changeType}
                    className="form-control"
                  >
                    <option>--Choose Tank type--</option>
                    {tanktype.map((e, key) => {
                      return (
                        <option value={e.type} key={key}>
                          {e.type}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div class="col-12 col-md-6">
                  <label for="country">Country</label>
                  <select
                    name="country"
                    ref="country"
                    value={this.state.country}
                    onChange={this.changeCountry}
                    className="form-control"
                  >
                    <option>--Choose Country--</option>
                    {uniqueCountry.map((e, key, final) => {
                      return (
                        <option value={e.country} key={key}>
                          {e.country}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              <div class="form-group row">
                <div class="col-12 col-md-6">
                  <label for="country">Tank Name</label>
                  <select
                    name="name"
                    value={this.state.name}
                    onChange={this.changeName}
                    className="form-control"
                  >
                    <option>--Choose Tank Name--</option>
                    {uniqueName.map((e, key, final) => {
                      return (
                        <option value={e.name} key={key}>
                          {e.name}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div class="col-12 col-md-6">
                  <label for="country">Ammunition</label>
                  <select
                    name="ammui"
                    value={this.state.ammui}
                    onChange={this.changeAmmu}
                    className="form-control"
                  >
                    <option>--Choose ammunition--</option>
                    {ammu.map((e, key, final) => {
                      return (
                        <option value={e} key={key}>
                          {e}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              <br></br>
              <br></br>

              <h4>Filtered Values: </h4>
              <label>{this.state.type}</label>
              <br></br>
              <label>{this.state.country}</label>
              <br></br>
              <label>{this.state.name}</label>
              <br></br>
              <label>{this.state.ammui}</label>
              <br></br>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
