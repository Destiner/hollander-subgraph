import { NewAuction } from '../types/Factory/Factory';
import { Auction, Factory } from '../types/schema';
import { Auction as AuctionTemplate } from '../types/templates';

function handleNewAuction(event: NewAuction): void {
  let factory = Factory.load(event.address.toString());
  if (!factory) {
    factory = new Factory(event.address.toString());
    factory.count = 0;
    factory.save();
  }
  factory.count++;
  factory.save();

  let auction = new Auction(factory.count.toString());
  auction.address = event.params.auction;
  auction.owner = event.params.owner;
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
