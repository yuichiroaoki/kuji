import { task } from "hardhat/config";

task("balance", "Prints an account's balance")
	.addParam("account", "The account's address")
	.setAction(async (taskArgs, hre) => {
		const account = hre.ethers.utils.getAddress(taskArgs.account)
		const provider = hre.ethers.provider;
		const balance = await provider.getBalance(account)

		console.log(hre.ethers.utils.formatEther(balance), "ETH")
	})

module.exports = {}