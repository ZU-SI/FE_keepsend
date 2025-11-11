"use client";

import { contactModalOpenAtom } from "@/store/contact.store";
import { useAtom } from "jotai";
import ContactModal from "../features/ContactModal";

export default function GlobalModals() {
  const [contactModalOpen, setContactModalOpen] = useAtom(contactModalOpenAtom);

  return (
    <>
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />
    </>
  );
}
