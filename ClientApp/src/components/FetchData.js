import React, { Component } from 'react';

export class FetchData extends Component {
  static displayName = FetchData.name;

  constructor(props) {
    super(props);
    this.state = { numbers: [], loading: true };
  }

  componentDidMount() {
    this.populateNumbersData();
  }

  static renderNumbersTable(numbers) {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Date</th>
            <th>Temp. (C)</th>
            <th>Temp. (F)</th>
            <th>Summary</th>
          </tr>
        </thead>
        <tbody>
          {/* {numbers.map(number =>
            <tr key={number.date}>
              <td>{number.date}</td>
              <td>{number.temperatureC}</td>
              <td>{number.temperatureF}</td>
              <td>{number.summary}</td>
            </tr>
          )} */}
          {numbers[0]}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : FetchData.renderNumbersTable(this.state.numbers);

    return (
      <div>
        <h1 id="tabelLabel" >Weather forecast</h1>
        <p>This component demonstrates fetching data from the server.</p>
        {contents}
      </div>
    );
  }

  async populateNumbersData() {
    const response = await fetch('numTest');
    const data = await response.json();
    this.setState({ numbers: data, loading: false });
  }
}
