import { CategoryRepository } from "adapters/repositories/ledger/category/categoryRepository";
import { LedgerRepository } from "adapters/repositories/ledger/ledger/ledgerRepository";


const ledgerRepository = new LedgerRepository("asd");
const categoryRepository = new CategoryRepository("asd");

export {ledgerRepository, categoryRepository}