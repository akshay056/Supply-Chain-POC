// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract CampaignFactory {
    address payable[] public deployedCampaigns;

    function createCampaign(uint minimum) public {
        address newCampaign = address(new Campaign(minimum, msg.sender));
        deployedCampaigns.push(payable(newCampaign));
    }

    function getDeployedCampaigns() public view returns (address payable[] memory) {
        return deployedCampaigns;
    }
}

contract Campaign {
    // struct Request {
    //     string orderId;
    //     string inspectedby;
    //     string approvedby;
    //     uint value;
    //     string selectedFile;
    //     address recipient;
    //     bool complete;
    //     uint approvalCount;
    //     mapping(address => bool) approvals;
    // }

    // struct SupplierShipment {
    //     string orderID;
    //     string logisticsProviderName;
    //     bool status;
    //     string shipmentDetails;
    //     string billOfLanding;
    //     string deliveryRecipt;
    // }

    // SupplierShipment[] public supplierShipments;


    struct SupplyChainData {
        string orderID;
        string manufacturerName;
        string supplierName;
        string invoiceReport;
        string deliveryRecipt;
        string logisticsName;
        string rmReport;
        string qualityReport;
        string insuranceReport;
        // string inspectedBy;
        // string approvedBy;
        string shipmentDetailsReport;
        // string billNo;
        string billOfLanding;
        bool status;
    }

     SupplyChainData[] public supplyChainDatas;

    // Request[] public requests;
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    // uint public approversCount;

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    constructor (uint minimum, address creator) {
        manager = creator;
        minimumContribution = minimum;
    }

    // function contribute() public payable {
    //     require(msg.value > minimumContribution);

    //     approvers[msg.sender] = true;
    //     approversCount++;
    // }

    // function createRequest(string memory orderId, string memory inspectedby,string memory approvedby, uint value,string memory selectedFile ,address recipient) public restricted {
    //     Request storage newRequest = requests.push(); 
    //     newRequest.orderId = orderId;
    //     newRequest.inspectedby = inspectedby;
    //     newRequest.approvedby = approvedby;  
    //     newRequest.value= value;
    //     newRequest.selectedFile= selectedFile;
    //     newRequest.recipient= recipient;
    //     newRequest.complete= false;
    //     newRequest.approvalCount= 0;
    // }

    // function createSupplierShipment(string memory orderID, string memory logisticsProviderName,string memory shipmentDetails,string memory billOfLanding, string memory deliveryRecipt) public restricted{
    //     SupplierShipment storage newSupplierShipment = supplierShipments.push();
    //     newSupplierShipment.orderID = orderID;
    //     newSupplierShipment.logisticsProviderName = logisticsProviderName;
    //     newSupplierShipment.status = false;
    //     newSupplierShipment.shipmentDetails = shipmentDetails;
    //     newSupplierShipment.billOfLanding = billOfLanding;
    //     newSupplierShipment.deliveryRecipt = deliveryRecipt;
    // }

//***** */

    function createManufacturerInvoice(string memory orderId, string memory manufacturerName,string memory supplierName,string memory invoiceReport) public {
        SupplyChainData storage newSupplyChainData = supplyChainDatas.push();
        newSupplyChainData.orderID = orderId;
        newSupplyChainData.manufacturerName = manufacturerName;
        newSupplyChainData.supplierName = supplierName;
        newSupplyChainData.invoiceReport = invoiceReport;
        newSupplyChainData.status = false;
    }


    function createManufacturerDelivery(string memory deliveryRecipt, uint index ) public {
        // SupplyChainData storage newSupplyChainData.orderID[orderID] = supplyChainDatas.push();
        SupplyChainData storage supplyChainData = supplyChainDatas[index];

        supplyChainData.deliveryRecipt = deliveryRecipt;
        supplyChainData.status = true;
        
    }

    function createSupplierReports(string memory rmReport,string memory qualityReport, string memory insuranceReport, uint index) public {
        SupplyChainData storage supplyChainData = supplyChainDatas[index];

        supplyChainData.rmReport = rmReport;
        supplyChainData.qualityReport = qualityReport;
        supplyChainData.insuranceReport = insuranceReport;
        // supplyChainData.inspectedBy = inspectedBy;
         // supplyChainData.approvedBy = approvedBy;
    }

    function createSupplierShipment(string memory logisticsName, string memory shipmentDetailsReport, uint index) public {
        SupplyChainData storage supplyChainData = supplyChainDatas[index];

        supplyChainData.logisticsName = logisticsName;
        supplyChainData.shipmentDetailsReport = shipmentDetailsReport;

    }

    function createLogisticsBill( string memory billOfLanding, uint index) public {
        SupplyChainData storage supplyChainData = supplyChainDatas[index];

    
        supplyChainData.billOfLanding = billOfLanding;

    }



    


    // function approveRequest(uint index) public {
    //     Request storage request = requests[index];

    //     require(approvers[msg.sender]);
    //     require(!request.approvals[msg.sender]);

    //     request.approvals[msg.sender] = true;
    //     request.approvalCount++;
    // }

    // function finalizeRequest(uint index) public restricted {
    //     Request storage request = requests[index];

    //     require(request.approvalCount > (approversCount / 2));
    //     require(!request.complete);

    //     payable(request.recipient).transfer(request.value);
    //     request.complete = true;
    // }
    
    // function getSummary() public view returns (
    //   uint, uint, uint, uint, address
    //   ) {
    //     return (
    //       minimumContribution,
    //       address(this).balance,
    //       requests.length,
    //       approversCount,
    //       manager
    //     );
    // }
    
    // function getRequestsCount() public view returns (uint) {
    //     return requests.length;
    // }

    // function getSupplierShipmentCount() public view returns (uint){
    //     return supplierShipments.length;
    // }

    function getSupplyChainDataCount() public view returns (uint){
        return supplyChainDatas.length;
    }
}