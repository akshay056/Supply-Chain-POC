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
        string shipmentDetailsReport;
        string billOfLanding;
        bool status;
    }

     SupplyChainData[] public supplyChainDatas;

    // Request[] public requests;
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    constructor (uint minimum, address creator) {
        manager = creator;
        minimumContribution = minimum;
    }

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


    function getSupplyChainDataCount() public view returns (uint){
        return supplyChainDatas.length;
    }
}