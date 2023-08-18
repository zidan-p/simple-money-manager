import { ledgerAPI } from "adapters/IPC/ledger/functionApis";
import { ActionApi } from "infra/actions";

export type PreloadType = ledgerAPI & ActionApi;

