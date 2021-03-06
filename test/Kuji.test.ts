import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { Kuji__factory, Kuji } from "../typechain";

describe("Kuji", function () {

	let kuji: Kuji;
	let linkToken: any;
	let owner: SignerWithAddress;
	let addr1: SignerWithAddress;
	let addr2: SignerWithAddress
	let addrs: SignerWithAddress[];

	const VRFCoordinator = "0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9"
	const linkAddress = "0xa36085F69e2889c224210F603D836748e7dC0088"
	const keyHash = "0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4"
	const probability = 2;

	beforeEach(async () => {
		[owner, addr1, addr2, ...addrs] = await ethers.getSigners();

		const VRFConsumer = await ethers.getContractFactory("VRFConsumer");
		const vrfConsumer = await VRFConsumer.deploy(
			VRFCoordinator,
			linkAddress,
		)

		const LinkToken = await ethers.getContractFactory("LinkToken");
		const totalSupply = (10 ** 9).toString()
		linkToken = await LinkToken.deploy(
			ethers.utils.parseEther(totalSupply),
		)

		const kujiFactory = (await ethers.getContractFactory(
			"Kuji", owner
		)) as Kuji__factory;
		kuji = await kujiFactory.deploy(
			vrfConsumer.address,
			linkToken.address,
			keyHash,
			probability
		);

		await kuji.deployed();

	})

	it("Should increase Link balance", async () => {

		expect((await kuji.getLinkBalance())).to.equal(ethers.BigNumber.from(0));

		await linkToken.transfer(kuji.address, ethers.utils.parseEther("1.0"))

		expect((await kuji.getLinkBalance())).to.equal(ethers.utils.parseEther("1.0"));

	})

	it('Should successfully send Link tokens', async () => {

		await linkToken.transfer(kuji.address, ethers.utils.parseEther("1.0"))
		await kuji.withdrawLINK(owner.address, ethers.utils.parseEther("1.0"))

		expect((await kuji.getLinkBalance())).to.equal(ethers.BigNumber.from(0));

	})

});