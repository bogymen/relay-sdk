import { getEIP712Domain } from "../../../utils";
import {
  Config,
  EIP712_DOMAIN_TYPE_DATA,
  SafeRequestPayload,
} from "../../types";
import {
  EIP712_SPONSORED_CALL_ERC2771_TYPE_DATA,
  SponsoredCallERC2771PayloadToSign,
  CallWithERC2771Struct,
  ERC2771Type,
  EIP712_CALL_WITH_SYNC_FEE_ERC2771_TYPE_DATA,
  CallWithSyncFeeERC2771PayloadToSign,
  CallWithConcurrentERC2771Struct,
  SponsoredCallConcurrentERC2771PayloadToSign,
  CallWithSyncFeeConcurrentERC2771PayloadToSign,
  EIP712_SPONSORED_CALL_CONCURRENT_ERC2771_TYPE_DATA,
  EIP712_CALL_WITH_SYNC_FEE_CONCURRENT_ERC2771_TYPE_DATA,
} from "../types";

export function getPayloadToSign(
  payload: {
    struct: SafeRequestPayload<
      CallWithERC2771Struct | CallWithConcurrentERC2771Struct
    >;

    type: ERC2771Type;
    isWallet: boolean;
  },
  config: Config
):
  | SponsoredCallERC2771PayloadToSign
  | CallWithSyncFeeERC2771PayloadToSign
  | SponsoredCallConcurrentERC2771PayloadToSign
  | CallWithSyncFeeConcurrentERC2771PayloadToSign {
  const { isWallet, struct, type } = payload;
  const domain = getEIP712Domain(
    { chainId: BigInt(struct.chainId), type },
    config
  );

  switch (type) {
    case ERC2771Type.SponsoredCall:
      if (isWallet) {
        return {
          domain,
          types: {
            ...EIP712_SPONSORED_CALL_ERC2771_TYPE_DATA,
          },
          message: struct as SafeRequestPayload<CallWithERC2771Struct>,
        };
      }
      return {
        domain,
        types: {
          ...EIP712_SPONSORED_CALL_ERC2771_TYPE_DATA,
          ...EIP712_DOMAIN_TYPE_DATA,
        },
        primaryType: "SponsoredCallERC2771",
        message: struct as SafeRequestPayload<CallWithERC2771Struct>,
      };
    case ERC2771Type.CallWithSyncFee:
      if (isWallet) {
        return {
          domain,
          types: {
            ...EIP712_CALL_WITH_SYNC_FEE_ERC2771_TYPE_DATA,
          },
          message: struct as SafeRequestPayload<CallWithERC2771Struct>,
        };
      }
      return {
        domain,
        types: {
          ...EIP712_CALL_WITH_SYNC_FEE_ERC2771_TYPE_DATA,
          ...EIP712_DOMAIN_TYPE_DATA,
        },
        primaryType: "CallWithSyncFeeERC2771",
        message: struct as SafeRequestPayload<CallWithERC2771Struct>,
      };

    case ERC2771Type.ConcurrentSponsoredCall:
      if (isWallet) {
        return {
          domain,
          types: {
            ...EIP712_SPONSORED_CALL_CONCURRENT_ERC2771_TYPE_DATA,
          },
          message:
            struct as SafeRequestPayload<CallWithConcurrentERC2771Struct>,
        };
      }
      return {
        domain,
        types: {
          ...EIP712_SPONSORED_CALL_CONCURRENT_ERC2771_TYPE_DATA,
          ...EIP712_DOMAIN_TYPE_DATA,
        },
        primaryType: "SponsoredCallConcurrentERC2771",
        message: struct as SafeRequestPayload<CallWithConcurrentERC2771Struct>,
      };
    case ERC2771Type.ConcurrentCallWithSyncFee:
      if (isWallet) {
        return {
          domain,
          types: {
            ...EIP712_CALL_WITH_SYNC_FEE_CONCURRENT_ERC2771_TYPE_DATA,
          },
          message:
            struct as SafeRequestPayload<CallWithConcurrentERC2771Struct>,
        };
      }
      return {
        domain,
        types: {
          ...EIP712_CALL_WITH_SYNC_FEE_CONCURRENT_ERC2771_TYPE_DATA,
          ...EIP712_DOMAIN_TYPE_DATA,
        },
        primaryType: "CallWithSyncFeeConcurrentERC2771",
        message: struct as SafeRequestPayload<CallWithConcurrentERC2771Struct>,
      };

    default:
      // eslint-disable-next-line no-case-declarations
      const _exhaustiveCheck: never = type;
      return _exhaustiveCheck;
  }
}
