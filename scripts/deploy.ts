import { ethers } from "hardhat";

/**
 * Constructor inherits VRFConsumerBase
 *
 * Network: Kovan
 * Chainlink VRF Coordinator address: 0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9
 * LINK token address:                0xa36085F69e2889c224210F603D836748e7dC0088
 * Key Hash: 0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4
 */

const VRFCoordinator = "0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9"
const linkAddress = "0xa36085F69e2889c224210F603D836748e7dC0088"
const keyHash = "0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4"

async function main() {
	const Contract = await ethers.getContractFactory("Kuji");

	const provider = ethers.provider;
	const network = await provider.getNetwork();
	const networkName = network.name;
	const ETHERSCAN_TX_URL = `https://${networkName}.etherscan.io/tx/`
	const probability = 2

	const contract = await Contract.deploy(
		VRFCoordinator,
		linkAddress,
		keyHash,
		probability
	);

	console.log("Token deployed to:", contract.address);
	console.log(
		`You did it! View your tx here: ${ETHERSCAN_TX_URL}${contract.deployTransaction.hash}`
	)
}

main()
	.then(() => process.exit(0))
	.catch(error => {
		console.error(error);
		process.exit(1);
	});