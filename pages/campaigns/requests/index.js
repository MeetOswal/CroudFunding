import React, { Component } from "react";
import Layout from "../../../components/Layout";
import { Button, Table } from "semantic-ui-react";
import { Link } from "../../../routes";
import web3 from "../../../ethereum/web3";
import Campaign from "../../../ethereum/campaign";
import RequestRow from "../../../components/RequestRow";

class RequestIndex extends Component {
  static async getInitialProps(props) {
    const { address } = props.query;
    const campaign = Campaign(address);
    const requestCount = await campaign.methods.numRequest().call();
    const approvers = await campaign.methods.approversCount().call();
    const requests = await Promise.all(
      Array(parseInt(requestCount))
        .fill()
        .map((element, index) => {
          return campaign.methods.requests(index).call();
        }) 
    );
    console.log(requests);

    return { 
      address: address,
      requests : requests, 
      requestCount : requestCount,
      approvers : approvers
    };
  }

  renderRows(){
    return this.props.requests.map((request,index)=>{
      return <RequestRow 
      request = {request} 
      id = {index}
      key = {index} 
      address = {this.props.address}
      approvers = {this.props.approvers}>
      </RequestRow>
    })
  }

  render() {
    const {Header, Row, HeaderCell, Body} = Table;


    return (
      <Layout>
        
        <Link route ={`/campaigns/${this.props.address}`}>
            <a>
               Back
            </a>
        </Link>

        <h3>Request List</h3>
        <Link route={`/campaigns/${this.props.address}/requests/new`}>
          <a>
            <Button primary floated="right" style ={{marginBottom : 10}}>Add Request</Button>
          </a>
        </Link>
        <Table>
          <Header>
            <Row>
              <HeaderCell>ID</HeaderCell>
              <HeaderCell>Description</HeaderCell>
              <HeaderCell>Amount</HeaderCell>
              <HeaderCell>Recipient</HeaderCell>
              <HeaderCell>Approval Count</HeaderCell>
              <HeaderCell>Approve</HeaderCell>
              <HeaderCell>Finalize</HeaderCell>
            </Row>
          </Header>
          <Body>
            {this.renderRows()}
          </Body>
        </Table>
        <div>Found {this.props.requestCount} requests</div>
      </Layout>
    );
  }
}

export default RequestIndex;
