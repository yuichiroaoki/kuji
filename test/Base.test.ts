import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { Base__factory, Base } from "../typechain";


describe("Base", () => {

	let base: Base;
	let owner: SignerWithAddress;
	let addr1: SignerWithAddress;
	let addr2: SignerWithAddress;
	let addrs: SignerWithAddress[];

	beforeEach(async () => {
		[owner, addr1, addr2, ...addrs] = await ethers.getSigners();

		const baseFactory = (await ethers.getContractFactory(
			"Base", owner
		)) as Base__factory;
		base = await baseFactory.deploy();
		await base.deployed();

	})

	it("Owner", async () => {

		expect(await base.owner()).to.equal(owner.address);

		const transactionHash = await owner.sendTransaction({
			to: base.address,
			value: ethers.utils.parseEther("1.0"), // Sends exactly 1.0 ether
		});

		await expect(base.withdraw(owner.address, ethers.utils.parseEther("1.0"),
		{from: addr1.toString()})).to.be.reverted;

		await base.withdraw(owner.address, ethers.utils.parseEther("1.0"));

		expect((await base.getBalance())).to.equal(ethers.BigNumber.from(0));

	});

	it("Balance", async () => {

		expect((await base.getBalance())).to.equal(ethers.BigNumber.from(0));

		const transactionHash = await owner.sendTransaction({
			to: base.address,
			value: ethers.utils.parseEther("1.0"), // Sends exactly 1.0 ether
		});


		expect((await base.getBalance())).to.equal(ethers.utils.parseEther("1.0"));

	})
});