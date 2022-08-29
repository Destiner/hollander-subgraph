import { NewAuction } from '../types/Factory/Factory';
import { Auction, Factory } from '../types/schema';

function handleNewAuction(event: NewAuction): void {
  let factory = Factory.load(event.address.toString());
  if (!factory) {
    factory = new Factory(event.address.toString());
  }

  let auction = new Auction(event.params.auction.toString());
  auction.owner = event.params.owner;
  auction.tokenBase = event.params.tokenBase;
  auction.tokenQuote = event.params.tokenQuote;
  auction.amountBase = event.params.amountBase;
  auction.initialPrice = event.params.initialPrice;
  auction.halvingPeriod = event.params.halvingPeriod;
  auction.swapPeriod = event.params.swapPeriod;
  auction.save();
}

// eslint-disable-next-line import/prefer-default-export
export { handleNewAuction };
