import { ProfesionalTurnos } from "./CardProximoTurno";



export function HomeProfesionales () {
    return (
        <div className="grid grid-cols-2 gap-4 p-4 -mt-4">
            <ProfesionalTurnos
                nombre={'Yoel Marain'}
                horaproximo={'14:00'}
                servicioproximo={'Corte'}
                turnoshoy={6}
                libreshoy={2}
            />

            <ProfesionalTurnos
                nombre={'Yoel Marain'}
                horaproximo={'14:00'}
                servicioproximo={'Corte'}
                turnoshoy={6}
                libreshoy={2}
            />
        </div>
    )
}