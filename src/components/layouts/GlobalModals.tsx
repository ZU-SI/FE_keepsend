"use client";

import { contactModalOpenAtom, policyModalOpenAtom } from "@/store/global-modal.store";
import { useAtom } from "jotai";
import ContactModal from "../features/ContactModal";
import PolicyModal from "../features/PolicyModal";

export default function GlobalModals() {
  const [contactModalOpen, setContactModalOpen] = useAtom(contactModalOpenAtom);
  const [policyModalOpen, setPolicyModalOpen] = useAtom(policyModalOpenAtom);

  return (
    <>
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />
      <PolicyModal
        isOpen={policyModalOpen}
        onClose={() => setPolicyModalOpen(false)}
      />
    </>
  );
}
