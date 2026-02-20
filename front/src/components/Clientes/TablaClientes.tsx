import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { getClientes } from "@/API/Admin/Clientes";
import { Users, PackageOpen } from "lucide-react";

interface Cliente {
    id: number;
    nombre?: string;
    nombre_cliente?: string;
    email?: string;
    telefono?: string;
    [key: string]: unknown;
}

function getNombre(c: Cliente): string {
    return c.nombre ?? c.nombre_cliente ?? `Cliente #${c.id}`;
}

function SkeletonRow() {
    return (
        <TableRow className="border-slate-700/60">
            {[...Array(4)].map((_, i) => (
                <TableCell key={i}>
                    <div className="h-4 bg-slate-700 rounded animate-pulse" />
                </TableCell>
            ))}
        </TableRow>
    );
}

export function TablaClientes() {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        getClientes()
            .then((data) => setClientes(data))
            .catch(() => setError(true))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="flex flex-col gap-4 w-full">
            {/* Header */}
            <div className="flex items-center gap-2">
                <div className="bg-violet-500/20 p-2 rounded-lg">
                    <Users className="w-5 h-5 text-violet-400" />
                </div>
                <div>
                    <h2 className="text-white font-semibold text-lg">Clientes</h2>
                    <p className="text-slate-400 text-xs">
                        {loading ? "Cargando..." : `${clientes.length} cliente${clientes.length !== 1 ? "s" : ""} registrado${clientes.length !== 1 ? "s" : ""}`}
                    </p>
                </div>
            </div>

            {error && (
                <div className="flex flex-col items-center justify-center py-10 rounded-xl border border-red-500/30 bg-red-500/5 text-center gap-2">
                    <p className="text-red-400 font-medium">No se pudieron cargar los clientes.</p>
                    <p className="text-slate-500 text-sm">Verificá que el servidor esté en línea.</p>
                </div>
            )}

            {!error && (
                <>
                    {loading || clientes.length > 0 ? (
                        <div className="rounded-xl overflow-hidden border border-slate-700">
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-slate-700 bg-slate-800/60 hover:bg-slate-800/60">
                                        <TableHead className="text-slate-300 font-semibold py-3">Cliente</TableHead>
                                        <TableHead className="text-slate-300 font-semibold text-center">ID</TableHead>
                                        <TableHead className="text-slate-300 font-semibold">Email</TableHead>
                                        <TableHead className="text-slate-300 font-semibold">Teléfono</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {loading
                                        ? [...Array(4)].map((_, i) => <SkeletonRow key={i} />)
                                        : clientes.map((cliente) => (
                                              <TableRow
                                                  key={cliente.id}
                                                  className="border-slate-700/60 hover:bg-slate-800/40 transition-colors"
                                              >
                                                  <TableCell className="py-4">
                                                      <div className="flex items-center gap-3">
                                                          <img
                                                              src={`https://i.pravatar.cc/40?u=cliente-${cliente.id}`}
                                                              alt={getNombre(cliente)}
                                                              className="w-9 h-9 rounded-full object-cover ring-1 ring-slate-600"
                                                          />
                                                          <span className="font-medium text-white">
                                                              {getNombre(cliente)}
                                                          </span>
                                                      </div>
                                                  </TableCell>
                                                  <TableCell className="text-center">
                                                      <span className="text-slate-400 text-sm">#{cliente.id}</span>
                                                  </TableCell>
                                                  <TableCell className="text-slate-300 text-sm">
                                                      {cliente.email ?? <span className="text-slate-600">—</span>}
                                                  </TableCell>
                                                  <TableCell className="text-slate-300 text-sm">
                                                      {cliente.telefono ?? <span className="text-slate-600">—</span>}
                                                  </TableCell>
                                              </TableRow>
                                          ))}
                                </TableBody>
                            </Table>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-16 rounded-xl border border-dashed border-slate-700 text-center gap-3">
                            <PackageOpen className="w-10 h-10 text-slate-600" />
                            <p className="text-slate-400 font-medium">No hay clientes registrados</p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
