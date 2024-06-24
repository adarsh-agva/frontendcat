import React from 'react'
import Style from "../../../css/UpdateExperienceDetails.module.css";
import { Button, Card, Checkbox, Label, TextInput } from 'flowbite-react';

function EditUserExp() {
  return (
    <Card
                    >
                        <form className="flex flex-row justify-between flex-wrap">
                            <div className="flex flex-col gap-4">
                                <section className={Style.FieldDiv}>
                                    <span className={Style.textSpan}>Association Name:</span>
                                    <TextInput  className='w-full' id="email1" type="text" placeholder="Enter association name" required />
                                </section>
                                <section className={Style.FieldDiv}>
                                    <span className={Style.textSpan}>Work Address:</span>
                                    <TextInput  className='w-full' id="email1" type="text" placeholder="Enter work address" required />
                                </section>
                                <section className={Style.FieldDiv}>
                                    <span className={Style.textSpan}>Start Date:</span>
                                    <TextInput  className='w-full' id="email1" type="date" placeholder="Enter contact" required />
                                </section>
                                <section className={Style.FieldDiv}>
                                    <span className={Style.textSpan}>End Date:</span>
                                    <TextInput className='w-full' id="email1" type="date" placeholder="Enter contact" required />
                                </section>
                                <section className={Style.FieldDiv}>
                                    <span className={Style.textSpan}>Work Type:</span>
                                    <TextInput className='w-full' id="email1" type="text" placeholder="Enter work type" required />
                                </section>
                            </div>

                            <div className="flex flex-col gap-4">
                                <section className={Style.FieldDiv}>
                                    <span className={Style.textSpan}>Work Email:</span>
                                    <TextInput className='w-full' id="email1" type="email" placeholder="Enter work email" required />
                                </section>
                                <section className={Style.FieldDiv}>
                                    <span className={Style.textSpan}>Work Phone No.:</span>
                                    <TextInput  className='w-full' id="email1" type="number" placeholder="Enter work contact no" required />
                                </section>
                                <section className={Style.FieldDiv}>
                                    <span className={Style.textSpan}>Designatin:</span>
                                    <TextInput  className='w-full' id="email1" type="text" placeholder="Enter designation" required />
                                </section>
                                <section className={Style.FieldDiv}>
                                    <span className={Style.textSpan}>Department:</span>
                                    <TextInput className='w-full' id="email1" type="text" placeholder="Enter department" required />
                                </section>
                            </div>
                        </form>
                        <button  style={{ backgroundColor: 'rgb(152, 0, 76)', color: 'white', padding: '8px', borderRadius: '10px' }} type="submit">Submit</button>
                    </Card >
  )
}

export default EditUserExp