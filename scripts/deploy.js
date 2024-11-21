const hre = require("hardhat");

async function main() {
  const initBalance = 100;
  const initMessage = "Hello, World!";
  const Assessment = await hre.ethers.getContractFactory("Assessment");
  const assessment = await Assessment.deploy(initBalance, initMessage);
  await assessment.deployed();

  console.log(`Contract deployed to ${assessment.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});