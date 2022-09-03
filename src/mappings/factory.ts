import { BigInt } from '@graphprotocol/graph-ts';

import { NewAuction } from '../types/Factory/Factory';
import { Auction, Factory } from '../types/schema';
import { Auction as AuctionTemplate } from '../types/templates';

function handleNewAuction(event: NewAuction): void {
  let factory = Factory.load(event.address.toHexString());
  if (!factory) {
    factory = new Factory(event.address.toHexString());
    factory.count = 0;
    factory.save();
  }
  factory.count++;
  factory.save();

  let auction = new Auction(factory.count.toString());
  auction.address = event.params.auction;
  auction.factory = event.address.toString();
  auction.owner = event.params.owner;
  auction.blockStart = BigInt.zero();
  auction.tokenBase = event.params.tokenBase;
  auction.tokenQuote = event.params.tokenQuote;
  auction.amountBase = event.params.amountBase;
  auction.initialPrice = event.params.initialPrice;
  auction.halvingPeriod = event.params.halvingPeriod;
  auction.swapPeriod = event.params.swapPeriod;
  auction.save();

  AuctionTemplate.create(event.params.auction);
}

// eslint-disable-next-line import/prefer-default-export
export { handleNewAuction };
