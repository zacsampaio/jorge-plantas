import { MapPinLine } from "phosphor-react";
import { CheckoutForm, CheckoutFormInputs, CheckoutFormTitles } from "./styled";
import { useDispatch } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { addressSchema } from "./addressSchema";
import { setAddress } from "../../../../redux/address/slice";
import { useEffect, useRef } from "react";
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

export function Form({ onFormValidation }: FormProps) {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
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

  return (
    <CheckoutForm onSubmit={handleSubmit(onSubmit)}>
      <CheckoutFormTitles>
        <MapPinLine size={22} />
        <h4>Endereço de Entrega</h4>
      </CheckoutFormTitles>
      <p>Informe o endereço onde deseja receber seu pedido</p>
      <p>Obs.: Valor fixo de R$ 15,00 para Fortaleza, para outras regiões consultar disponibilidade através do WhatsApp.</p>
      <CheckoutFormInputs>
        <input
          placeholder="CEP"
          {...register("zipCode", { required: "CEP é obrigatório" })}
        />
        {errors.zipCode && (
          <span>
            {errors.zipCode.message + " - Por favor, verifique o CEP."}
          </span>
        )}
      </CheckoutFormInputs>
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
