import React from "react";
import contract_abi from "./crowdfundInstance";
import project_abi from "./crowdfundProjectInstance";
// import web3 from "./web3";

const address = "0x5Cde647A68123Bd8F8C0E8F087b03c6a19429c13";
const crowdfundInstance = new window.web3.eth.Contract(contract_abi, address);

const crowdFundingObj = {
  name: "App",
  data() {
    return {
      startProjectDialog: false,
      account: null,
      stateMap: [
        { color: "primary", text: "Ongoing" },
        { color: "warning", text: "Expired" },
        { color: "success", text: "Completed" },
      ],
      projectData: [],
      newProject: { isLoading: false },
    };
  },
  mounted() {
    // this code snippet takes the account (wallet) that is currently active
    web3.eth.getAccounts().then((accounts) => {
      [this.account] = accounts;
      this.getProjects();
    });
  },
  methods: {
    setNewProject(title, details, duration, amount) {
      this.newProject.title = title;
      this.newProject.description = details;
      this.newProject.duration = duration;
      this.newProject.amountGoal = amount;
    },
    getProjects() {
      crowdfundInstance.methods
        .returnAllProjects()
        .call()
        .then((projects) => {
          projects.forEach((projectAddress) => {
            const projectInst = new web3.eth.Contract(project_abi, projectAddress);
            projectInst.methods
              .getDetails()
              .call()
              .then((projectData) => {
                const projectInfo = projectData;
                projectInfo.isLoading = false;
                projectInfo.contract = projectInst;
                this.projectData.push(projectInfo);
              });
          });
        });
    },
    startProject() {
      this.newProject.isLoading = true;
      crowdfundInstance.methods
        .startProject(
          this.newProject.title,
          this.newProject.description,
          this.newProject.duration,
          web3.utils.toWei(this.newProject.amountGoal, "ether")
        )
        .send({
          from: this.account,
        })
        .then((res) => {
          const projectInfo = res.events.ProjectStarted.returnValues;
          projectInfo.isLoading = false;
          projectInfo.currentAmount = 0;
          projectInfo.currentState = 0;
          projectInfo.contract = new web3.eth.Contract(project_abi, projectInfo.contractAddress);
          this.startProjectDialog = false;
          this.newProject = { isLoading: false };
        });
    },
    fundProject(index) {
      if (!this.projectData[index].fundAmount) {
        return;
      }
      const projectContract = this.projectData[index].contract;
      this.projectData[index].isLoading = true;
      projectContract.methods
        .contribute()
        .send({
          from: this.account,
          value: web3.utils.toWei(this.projectData[index].fundAmount, "ether"),
        })
        .then((res) => {
          const newTotal = parseInt(
            res.events.FundingReceived.returnValues.currentTotal,
            10
          );
          const projectGoal = parseInt(this.projectData[index].goalAmount, 10);
          this.projectData[index].currentAmount = newTotal;
          this.projectData[index].isLoading = false;
          // Set project state to success
          if (newTotal >= projectGoal) {
            this.projectData[index].currentState = 2;
          }
        });
    },
    getRefund(index) {
      this.projectData[index].isLoading = true;
      this.projectData[index].contract.methods
        .getRefund()
        .send({
          from: this.account,
        })
        .then(() => {
          this.projectData[index].isLoading = false;
        });
    },
  },
};

export default crowdFundingObj;
