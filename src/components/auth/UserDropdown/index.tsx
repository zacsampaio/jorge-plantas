import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CaretDown } from "phosphor-react";
import { UserAvatar } from "../UserAvatar";
import { useAuth } from "../../../hooks/useAuth";
import {
  DropdownDivider,
  DropdownItem,
  DropdownMenu,
  DropdownWrapper,
  TriggerButton,
  TriggerName,
} from "./styled";

export function UserDropdown() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  if (!user) return null;

  const handleSignOut = async () => {
    await signOut();
    setOpen(false);
    navigate("/");
  };

  return (
    <DropdownWrapper ref={wrapperRef}>
      <TriggerButton
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((prev) => !prev)}
      >
        <UserAvatar name={user.fullName} />
        <TriggerName>{user.fullName.split(" ")[0]}</TriggerName>
        <CaretDown size={14} weight="bold" aria-hidden="true" />
      </TriggerButton>

      {open && (
        <DropdownMenu role="menu">
          <DropdownItem
            role="menuitem"
            onClick={() => {
              navigate("/account/profile");
              setOpen(false);
            }}
          >
            Meu Perfil
          </DropdownItem>
          <DropdownItem
            role="menuitem"
            onClick={() => {
              navigate("/account/orders");
              setOpen(false);
            }}
          >
            Meus Pedidos
          </DropdownItem>
          {user.role === "admin" && (
            <DropdownItem
              role="menuitem"
              onClick={() => {
                navigate("/admin/products");
                setOpen(false);
              }}
            >
              Painel Admin
            </DropdownItem>
          )}
          <DropdownDivider />
          <DropdownItem role="menuitem" onClick={handleSignOut}>
            Sair
          </DropdownItem>
        </DropdownMenu>
      )}
    </DropdownWrapper>
  );
}
