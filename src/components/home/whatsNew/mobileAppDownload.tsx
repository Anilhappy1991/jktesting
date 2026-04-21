// import * as React from "react"
import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { useSendContactDataMutation } from "@/features/home/contactApis"
import { useTranslation } from "@/context/languageContext"

const getContactOptions = (t: any) =>
  [
    { value: "email", label: t("getApp.radioEmail") },
    { value: "phone", label: t("getApp.radioPhone") },
  ] as const

// Extract the type from the function's return value
type ContactMethod = ReturnType<typeof getContactOptions>[number]["value"]

export default function MobileAppDownload() {
  const [sendContactData] = useSendContactDataMutation()
  const [contactMethod, setContactMethod] = useState<ContactMethod>("email")
  const [message, setMessage] = useState("")
  const [submittedForm, setSubmittedForm] = useState(false)
  const { t } = useTranslation()
  const isEmail = contactMethod === "email"

  const contactOptions = getContactOptions(t)

  const formSchema = z.object({
    contact: isEmail
      ? z.string().email("Enter a valid email")
      : z
          .string()
          .min(10, "Enter valid phone number")
          .regex(/^[0-9]+$/, "Only numbers allowed"),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contact: "",
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      console.log("Submitting contact data:", data)

      const res = await sendContactData({
        contact: data.contact,
        is_phone: !isEmail,
      }).unwrap()
      console.log("API response:", res)
      if (res.status) {
        setMessage(
          `You will receive the link on your ${isEmail ? "email" : "phone number"} shortly!`
        )
        form.reset()
        setSubmittedForm(true)
      }
    } catch (error) {
      console.error("API Error:", error)
      setMessage("Something went wrong") // or show toast
    }
  }

  const handleFillAgain = () => {
    setMessage("")
    setSubmittedForm(false)
    form.reset()
  }

  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto grid items-center gap-10 px-4 lg:grid-cols-[minmax(0,320px)_1fr] lg:px-4">
        {/* IMAGE */}
        <div className="mx-auto gap-5 lg:w-[250px]">
          <img
            src="/images/mobileapp.png"
            alt="JK HUDD mobile app preview"
            className="relative h-[350px] object-cover"
          />
        </div>

        {/* CONTENT */}
        <div className="mx-auto lg:w-[360px]">
          <h2 className="text-[20px] font-medium tracking-tight text-slate-900">
            {t("getApp.title")}
          </h2>

          <p className="mt-2 text-[12px] text-slate-600">
            {t("getApp.subtitle")}
          </p>

          {/* RADIO */}
          <div className="mt-5 flex flex-wrap items-center gap-8">
            {contactOptions.map((option) => {
              const isActive = contactMethod === option.value

              return (
                <label
                  key={option.value}
                  className="flex cursor-pointer items-center gap-3 text-[14px] font-medium text-slate-700"
                >
                  <input
                    type="radio"
                    checked={isActive}
                    onChange={() => {
                      setContactMethod(option.value)
                      form.reset({ contact: "" }) // reset on switch
                    }}
                    className="h-4 w-4 accent-[#0f4c81]"
                  />
                  <span className={isActive ? "text-slate-900" : ""}>
                    {option.label}
                  </span>
                </label>
              )
            })}
          </div>

          {/* FORM */}
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={`mt-5 w-full lg:max-w-[640px]`}
          >
            <FieldGroup>
              <Controller
                name="contact"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-gray-700">
                      {isEmail
                        ? t("getApp.radioEmail")
                        : t("getApp.radioPhone")}
                    </FieldLabel>

                    <div
                      className={`flex min-h-9 overflow-hidden rounded-sm border border-slate-200 bg-white shadow-sm ${submittedForm ? "pointer-events-none opacity-70" : ""}`}
                    >
                      <input
                        {...field}
                        type={isEmail ? "email" : "tel"}
                        placeholder={
                          isEmail
                            ? t("getApp.placeholderEmail")
                            : t("getApp.placeholderPhone")
                        }
                        className="min-w-0 flex-1 px-6 text-[12px] text-slate-700 outline-none placeholder:text-slate-500"
                      />

                      <button
                        type="submit"
                        className={`shrink-0 cursor-pointer bg-[#0f4c81] px-2 text-[12px] font-medium text-white hover:bg-[#0b3a63]`}
                        disabled={submittedForm}
                      >
                        {t("getApp.submit")}
                      </button>
                    </div>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                    {message && (
                      <div className="flex items-start gap-2 text-sm">
                        <p className="text-green-600">{message}</p>
                        <span
                          className="w-20 cursor-pointer text-blue-500 hover:underline"
                          onClick={handleFillAgain}
                        >
                          Fill again
                        </span>
                      </div>
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>

          {/* STORE LINKS */}
          <div className="mt-4">
            <p className="text-sm text-slate-500">{t("getApp.downloadText")}</p>

            <div className="mt-4 flex flex-wrap items-center gap-4">
              <a href="https://apps.apple.com/" target="_blank">
                <img
                  src="/images/appstoredownloadbtn.png"
                  className="h-10 rounded-xl"
                />
              </a>

              <a href="https://play.google.com/store/" target="_blank">
                <img
                  src="/images/playstoredownloadbtn.png"
                  className="h-10 rounded-xl"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
