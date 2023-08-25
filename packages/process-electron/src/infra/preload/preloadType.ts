import { ledgerAPI } from "adapters/IPC/ledger/functionApis";
import { ActionApi } from "infra/actions";


// aparently typescript or my device can't infer what PreloadType is.
// it always type PreloadType as any
type PreloadType = ledgerAPI & ActionApi & {};

export {
  type PreloadType,
  type ledgerAPI,
  type ActionApi
}