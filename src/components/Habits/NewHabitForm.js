import styled from "styled-components";
import Input from "../shared/Input";
import Button from "../shared/Button";
import DayInput from "../shared/DayInput";
import { useState } from "react";

import { defaultWeekDays } from "../../services/habits";
import { createNewHabit } from "../../services/trackit";

export default function NewHabitForm({ setCreatingHabit, loggedUser, updateHabits }) {
	const daysWeek = defaultWeekDays;
	
	const [selectedDaysWeek, setSelectedDaysWeek] = useState(defaultWeekDays);
	const [isLoading, setLoading] = useState(false);
	const [newHabit, setNewHabit] = useState({
		name: "",
		days: null
	});

	function selectDay(day, index) {
		const tmpSelectedDaysWeek = [...selectedDaysWeek];

		if (day.isSelected) {
			tmpSelectedDaysWeek[index].isSelected = false;
			setSelectedDaysWeek(tmpSelectedDaysWeek);
		}
		else {
			tmpSelectedDaysWeek[index].isSelected = true;
			setSelectedDaysWeek(tmpSelectedDaysWeek);
		}
		const tmpNewHabit = { ...newHabit };
		tmpNewHabit.days = selectedDaysWeek.filter((day) => day.isSelected).map((dayFilterd) => dayFilterd.id);

		setNewHabit(tmpNewHabit);
	}

	function createHabit(event) {
		event.preventDefault();
		if (!selectedDaysWeek.find((day) => day.isSelected))
			return alert("Escolha pelo menos um dia da semana");
		setLoading(true);

		createNewHabit(loggedUser.token, newHabit)
			.then(() => {
				setLoading(false);
				setCreatingHabit(false);
				updateHabits();
			})
			.catch((err) => {
				setLoading(false);
				alert("Erro ao salvar hábito");
			});

		setSelectedDaysWeek([...defaultWeekDays]);
		setNewHabit({
			name: "",
			days: null
		});
	}

	function cancel() {
		setLoading(false);
		setCreatingHabit(false);
	}

	return (
		<Form onSubmit={createHabit}>
			<Input disabled={isLoading} placeholder="nome do hábito" required value={newHabit.name}
				onChange={(e) => setNewHabit({ ...newHabit, name: e.target.value })}
			/>
			<div>
				{daysWeek.map((day, index) => (
					<DayInput disabled={isLoading} type="button" value={day.value} selected={day.isSelected}
						onClick={() => selectDay(day, index)} />
				))}
			</div>
			<Buttons>
				<Button type="cancel" disabled={isLoading}
					width={84} height={35} onClick={cancel}>
					Cancelar
				</Button>

				<Button type="submit" disabled={isLoading}
					width={84} height={35}>
					Salvar
				</Button>
			</Buttons>
		</Form>
	);
}

const Form = styled.form`
	background-color: #FFFFFF;
	border-radius: 5px;
	padding: 18px;
	height: 180px;
	position: relative;
	display: flex;
	flex-direction: column;
	margin-top: 5px;

	button {
		margin-top: 29px;
		margin-right: 4px;
		font-size: 16px;
	}`

const Buttons = styled.div`
	display: flex;
	width: 100%;
	justify-content: flex-end;
`