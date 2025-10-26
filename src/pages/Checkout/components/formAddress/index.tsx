import { MapPinLine, MagnifyingGlass } from "phosphor-react";
import { CheckoutForm, CheckoutFormInputs, CheckoutFormTitles, CepInputContainer, SearchButton } from "./styled";
import { useDispatch } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { addressSchema } from "./addressSchema";
import { setAddress } from "../../../../redux/address/slice";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

interface FormProps {
  onFormValidation: (valid: boolean) => void;
}

interface FormData {
  zipCode: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
}

interface ViaCEPResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}

export function Form({ onFormValidation }: FormProps) {
  const dispatch = useDispatch();
  const [isLoadingCep, setIsLoadingCep] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(addressSchema),
    mode: "onChange",
  });

  const formData = watch();

  const previousFormData = useRef<FormData | null>(null);

  useEffect(() => {
    if (
      isValid &&
      JSON.stringify(formData) !== JSON.stringify(previousFormData.current)
    ) {
      dispatch(setAddress(formData));
      previousFormData.current = formData;
    }

    onFormValidation(isValid);
  }, [formData, isValid, dispatch, onFormValidation]);

  const onSubmit = (data: FormData) => {
    dispatch(setAddress(data));
    onFormValidation(true);
  };

  const fetchAddressByCep = async (cep: string) => {
    const cleanCep = cep.replace(/\D/g, "");
    
    if (cleanCep.length !== 8) {
      alert("CEP deve ter 8 dígitos");
      return;
    }

    setIsLoadingCep(true);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
      const data: ViaCEPResponse = await response.json();

      if (data.erro) {
        alert("CEP não encontrado. Por favor, verifique o CEP informado.");
        setIsLoadingCep(false);
        return;
      }

      setValue("street", data.logradouro);
      setValue("neighborhood", data.bairro);
      setValue("city", data.localidade);
      setValue("state", data.uf);
      
      if (data.complemento) {
        setValue("complement", data.complemento);
      }
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
      alert("Erro ao buscar CEP. Tente novamente.");
    } finally {
      setIsLoadingCep(false);
    }
  };

  const handleSearchCep = () => {
    const cepValue = watch("zipCode");
    if (cepValue) {
      fetchAddressByCep(cepValue);
    } else {
      alert("Por favor, insira um CEP.");
    }
  };

  const formatCep = (value: string) => {
    const cleanValue = value.replace(/\D/g, "");
    if (cleanValue.length <= 8) {
      return cleanValue.replace(/(\d{5})(\d{3})/, "$1-$2");
    }
    return value.substring(0, 9);
  };

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCep(e.target.value);
    setValue("zipCode", formatted);
  };

  return (
    <CheckoutForm onSubmit={handleSubmit(onSubmit)}>
      <CheckoutFormTitles>
        <MapPinLine size={22} />
        <h4>Endereço de Entrega</h4>
      </CheckoutFormTitles>
      <p>Informe o endereço onde deseja receber seu pedido</p>
      <p>Obs.: Entregas apenas para Grande Fortaleza/CE.</p>
      <CepInputContainer>
        <input
          placeholder="CEP (00000-000)"
          {...register("zipCode", { required: "CEP é obrigatório" })}
          onChange={handleCepChange}
          maxLength={9}
          disabled={isLoadingCep}
        />
        <SearchButton 
          type="button" 
          onClick={handleSearchCep}
          disabled={isLoadingCep}
        >
          <MagnifyingGlass size={20} />
          {isLoadingCep ? "Buscando..." : "Buscar"}
        </SearchButton>
      </CepInputContainer>
      {isLoadingCep && <span>Buscando endereço...</span>}
      {errors.zipCode && (
        <span>
          {errors.zipCode.message + " - Por favor, verifique o CEP."}
        </span>
      )}
      <input
        placeholder="Rua"
        {...register("street", { required: "Rua é obrigatória" })}
      />
      {errors.street && (
        <span>
          {errors.street?.message + " - Este campo não pode estar vazio."}
        </span>
      )}
      <CheckoutFormInputs className="address-line-3">
        <input
          placeholder="Número"
          {...register("number", { required: "Número é obrigatório" })}
        />
        {errors.number && (
          <span>
            {errors.number?.message + " - Informe o número do endereço."}
          </span>
        )}
        <div className="complement-container">
          <input placeholder="Complemento" {...register("complement")} />
          <span className="optional-text">Opcional</span>
        </div>
      </CheckoutFormInputs>
      <CheckoutFormInputs>
        <input
          placeholder="Bairro"
          {...register("neighborhood", { required: "Bairro é obrigatório" })}
        />
        {errors.neighborhood && (
          <span>
            {errors.neighborhood?.message +
              " - Não pode deixar este campo em branco."}
          </span>
        )}

        <input
          placeholder="Cidade"
          {...register("city", { required: "Cidade é obrigatória" })}
        />
        {errors.city && (
          <span>
            {errors.city?.message + " - Preencha a cidade corretamente."}
          </span>
        )}

        <input
          placeholder="UF"
          {...register("state", { required: "UF é obrigatório" })}
        />
        {errors.state && (
          <span>
            {errors.state?.message + " - Preencha o estado corretamente."}
          </span>
        )}
      </CheckoutFormInputs>
    </CheckoutForm>
  );
}
