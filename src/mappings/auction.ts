import { Auction, Init, Swap, Withdraw } from '../types/schema';
import {
  Init as InitEvent,
  Swap as SwapEvent,
  Withdraw as WithdrawEvent,
} from '../types/templates/Auction/Auction';

function handleInit(event: InitEvent): void {
  let auction = Auction.load(event.address.toHexString());
  if (!auction) {
    return;
  }

  let eventId =
    event.transaction.hash.toString() + '-' + event.logIndex.toString();
  let init = new Init(eventId);
  init.auction = auction.id;
  init.save();
}

function handleSwap(event: SwapEvent): void {
  let auction = Auction.load(event.address.toHexString());
  if (!auction) {
    return;
  }

  let eventId =
    event.transaction.hash.toString() + '-' + event.logIndex.toString();
  let swap = new Swap(eventId);
  swap.auction = auction.id;
  swap.buyer = event.params.buyer;
  swap.buyAmount = event.params.amountBuy;
  swap.sellAmount = event.params.amountSell;
  swap.save();
}

function handleWithdraw(event: WithdrawEvent): void {
  let auction = Auction.load(event.address.toHexString());
  if (!auction) {
    return;
  }

  let eventId =
    event.transaction.hash.toString() + '-' + event.logIndex.toString();
  let withdraw = new Withdraw(eventId);
  withdraw.auction = auction.id;
  withdraw.amount = event.params.amount;
  withdraw.save();
}

export { handleInit, handleSwap, handleWithdraw };
