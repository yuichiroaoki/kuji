import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { Base__factory, Base } from "../typechain";

describe("Base", function () {

	let base: Base;
	let owner: SignerWithAddress;
	let addr1: SignerWithAddress;
	let addr2: SignerWithAddress
	let addrs: SignerWithAddress[];

	beforeEach(async () => {
		[owner, addr1, addr2, ...addrs] = await ethers.getSigners();

		const baseFactory = (await ethers.getContractFactory(
			"Base", owner
		)) as Base__factory;
		base = await baseFactory.deploy();
		await base.deployed();

	})

	it("Owner", async function () {

		expect(await base.owner()).to.equal(owner.address);

	});
});