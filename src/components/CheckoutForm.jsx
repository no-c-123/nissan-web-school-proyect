const handleSubmit = async (e) => {
    e.preventDefault();
  
    // validation logic...
  
    const { data: cotizacionData, error: cotizacionError } = await supabase.from('cotizaciones').insert([{
      user_id: user.id,
      modelo: selectedCar.modelo,
      metodo_pago: selectedPayment,
      precio: totalPrice,
      sucursal: selectedSucursal,
      comentarios: userComments,
      created_at: new Date().toISOString()
    }]).select().single(); // to get the generated UUID
  
    if (cotizacionError) {
      console.error('Error al guardar cotización:', cotizacionError.message);
      return;
    }
  
    // Then insert corresponding ingreso
    const { error: ingresoError } = await supabase.from('ingresos_egresos').insert([{
      tipo: 'Ingreso',
      monto: totalPrice,
      fecha: new Date().toISOString(),
      user_id: user.id,
      tipo_pago: selectedPayment,
      orden_id: cotizacionData.id
    }]);
  
    if (ingresoError) {
      console.error('Error al registrar ingreso:', ingresoError.message);
    }
  
    // redirect, show confirmation, etc.
  };
  